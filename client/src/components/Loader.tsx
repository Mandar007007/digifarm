import { Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <div className="">
      <Spinner
        thickness="5px"
        speed="0.3s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
}
