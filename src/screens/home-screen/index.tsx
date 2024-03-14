import SafeAreaWrapper from "components/shared/safe-area-wrapper";
import React from "react";
import { fetcher } from "services/config";
import useSWR from "swr";
import { Box, Text } from "utils/theme";

const HomeScreen = () => {
  const { data, isLoading } = useSWR("category", fetcher);
  console.log(`data`, JSON.stringify(data, null, 2));

  return (
    <SafeAreaWrapper>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
