import React, { useState } from "react";
import { FlatList, Pressable, TextInput } from "react-native";
import { Box, Text } from "utils/theme";
import { isToday, format } from "date-fns";
import useSWR from "swr";
import Loader from "components/shared/loader";
import axiosInstance, { fetcher } from "services/config";
import { Calendar } from "react-native-calendars";
import useSWRMutation from "swr/dist/mutation";

type TaskActionsProps = {
  categoryId: string;
};

const today = new Date();

const todayISODate = new Date("2024-04-12").toISOString();

const createTaskRequest = async (
  url: string,
  { arg }: { arg: ITaskRequest }
) => {
  try {
    await axiosInstance.post(url, {
      ...arg,
    });
  } catch (error) {
    console.log(error);
  }
};

const TaskActions = ({ categoryId }: TaskActionsProps) => {
  const [newTask, setNewTask] = useState<ITaskRequest>({
    categoryId: categoryId,
    date: todayISODate,
    isCompleted: false,
    name: "",
  });

  const { data, trigger } = useSWRMutation("task/create", createTaskRequest);

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const { data: categories, isLoading } = useSWR<ICategory[]>(
    "category",
    fetcher
  );

  if (isLoading || !categories) {
    return <Loader />;
  }

  const selectedCategory = categories?.find(
    (_category) => _category._id === newTask.categoryId
  );
  console.log(selectedCategory);

  const onCreateTask = async () => {
    try {
      if (newTask.name.length.toString().trim().length > 0) {
        await trigger({
          ...newTask,
        });
        setNewTask({
          categoryId: newTask.categoryId,
          isCompleted: false,
          date: todayISODate,
          name: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mb="3">
      <Box
        bg="gray300"
        px="4"
        py="3.5"
        borderRadius="rounded-5xl"
        flexDirection="row"
        position="relative"
      >
        <TextInput
          placeholder="Create a new task"
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            fontSize: 16,
            width: "50%",
          }}
          maxLength={36}
          textAlignVertical="center"
          value={newTask.name}
          onChangeText={(text) => {
            setNewTask((prev) => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
          onSubmitEditing={onCreateTask}
        />
        <Box flexDirection="row" alignItems="center">
          <Pressable
            onPress={() => {
              setIsSelectingDate((prev) => !prev);
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              bg="white"
              p="2"
              borderRadius="rounded-xl"
            >
              <Text>
                {isToday(new Date(newTask.date))
                  ? "Today"
                  : format(new Date(newTask.date), "MMM dd")}
              </Text>
            </Box>
          </Pressable>
          <Box width={12} />
          <Pressable
            onPress={() => {
              setIsSelectingCategory((prev) => !prev);
            }}
          >
            <Box
              bg="white"
              flexDirection="row"
              alignItems="center"
              p="2"
              borderRadius="rounded-xl"
            >
              <Box
                width={12}
                height={12}
                borderRadius="rounded"
                borderWidth={2}
                mr="1"
                style={{ borderColor: selectedCategory?.color.code }}
              ></Box>
              <Text
                style={{
                  color: selectedCategory?.color.code,
                }}
              >
                {selectedCategory?.name}
              </Text>
            </Box>
          </Pressable>
        </Box>

        {isSelectingCategory && (
          <Box position="absolute" right={40} bottom={-120}>
            <FlatList
              data={categories}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      setNewTask((prev) => {
                        return {
                          ...prev,
                          categoryId: item._id,
                        };
                      });
                      setIsSelectingCategory(false);
                    }}
                  >
                    <Box
                      bg="gray300"
                      p="2"
                      borderTopStartRadius={
                        index === 0 ? "rounded-3xl" : "none"
                      }
                      borderTopEndRadius={index === 0 ? "rounded-3xl" : "none"}
                      borderBottomStartRadius={
                        categories?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                      borderBottomEndRadius={
                        categories?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                    >
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            newTask.categoryId === item._id ? "700" : "400"
                          }
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
            />
          </Box>
        )}
      </Box>
      {isSelectingDate && (
        <Box>
          <Calendar
            minDate={format(today, "dd-MM-y")}
            onDayPress={(day) => {
              setIsSelectingDate(false);
              const selectedDate = new Date(day.dateString).toISOString();
              setNewTask((prev) => {
                return {
                  ...prev,
                  date: selectedDate,
                };
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TaskActions;
