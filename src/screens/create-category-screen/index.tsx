import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "components/shared/button";
import NavigateBack from "components/shared/navigate-back";
import SafeAreaWrapper from "components/shared/safe-area-wrapper";
import { CategoriesStackParamList } from "navigation/types";
import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import axiosInstance, { BASE_URL } from "services/config";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import theme, { Box, Text } from "utils/theme";
import { getColors, getIcons } from "utils/theme/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = getColors();
const ICONS = getIcons();

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_ICON = ICONS[0];

const createCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  try {
    await axiosInstance.post(url, {
      ...arg,
    });
  } catch (error) {
    console.log("error registrar categoria be", error);
    throw error;
  }
};
const updateCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  try {
    await axiosInstance.put(url, {
      ...arg,
    });
  } catch (error) {
    console.log("error ao editar categoria", error);
    throw error;
  }
};

const deleteCategoryRequest = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  try {
    await axiosInstance.delete(url + "/" + arg.id);
  } catch (error) {
    console.log("error ao deletar categoria", error);
    throw error;
  }
};

type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<CreateCategoryRouteTypes>();

  const isEditing = route.params.category ? true : false;

  const { trigger, isMutating } = useSWRMutation(
    "category/create",
    createCategoryRequest
  );
  const { trigger: updateTrigger } = useSWRMutation(
    "category/update",
    updateCategoryRequest
  );
  const { trigger: deleteTrigger } = useSWRMutation(
    "category/",
    deleteCategoryRequest
  );

  const { mutate } = useSWRConfig();

  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, "_id" | "user" | "isEditable">
  >({
    name: route.params.category?.name ?? "",
    color: route.params.category?.color ?? DEFAULT_COLOR,
    icon: route.params.category?.icon ?? DEFAULT_ICON,
  });

  const createNewCategory = async () => {
    try {
      if (isEditing) {
        const updatedCategoryItem = {
          ...route.params.category,
          ...newCategory,
        };
        await updateTrigger({
          ...updatedCategoryItem,
        });
      } else {
        trigger({
          ...newCategory,
        });
      }
      await mutate(BASE_URL + "category");
      navigation.goBack();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateColor = (color: IColor) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        color,
      };
    });
  };

  const updateIcon = (icon: IIcon) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        icon,
      };
    });
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id)
        await deleteTrigger({
          id: route.params.category?._id,
        });
      await mutate(BASE_URL + "category");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(newCategory);

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <NavigateBack />
          {isEditing && (
            <Pressable onPress={deleteCategory}>
              <MaterialCommunityIcons
                name="delete"
                color={theme.colors.rose500}
                size={24}
              />
            </Pressable>
          )}
        </Box>
        <Box height={16} />
        <Box bg="gray300" borderRadius="rounded-2xl">
          <TextInput
            style={{
              fontSize: 20,
              lineHeight: 26,
              padding: 16,
            }}
            value={newCategory.name}
            maxLength={36}
            placeholder="Create New List"
            placeholderTextColor={theme.colors.gray600}
            onChangeText={(text) => {
              setNewCategory((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
          />
        </Box>
        <Box height={24} />
        <Box bg="gray300" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={64}
            p="2"
            borderRadius="rounded-2xl"
            alignItems="center"
            mb="3"
          >
            <Text
              variant="textXs"
              fontWeight="600"
              color={newCategory.color.name as any}
            >
              Colors
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map((_color) => {
              return (
                <Pressable
                  key={_color.id}
                  onPress={() => {
                    updateColor(_color);
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: _color.code,
                    }}
                    width={24}
                    height={24}
                    borderRadius="rounded-2xl"
                  ></Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>

        <Box height={24} />

        <Box bg="gray300" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={80}
            p="2"
            borderRadius="rounded-2xl"
            alignItems="center"
            mb="3"
          >
            <Text
              variant="textBase"
              fontWeight="600"
              color={newCategory.color.name as any}
            >
              {newCategory.icon.symbol}
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map((_icon) => {
              return (
                <Pressable
                  key={_icon.id}
                  onPress={() => {
                    updateIcon(_icon);
                  }}
                >
                  <Box width={24} height={24} borderRadius="rounded-2xl">
                    <Text>{_icon.symbol}</Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>
        <Box position="absolute" bottom={4} left={0} right={0}>
          <Button
            label={isEditing ? "Edit Category" : "Create New Category"}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;
