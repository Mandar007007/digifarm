import { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import toast from "react-hot-toast";
import axios from "axios";

import { AddIcon, CopyIcon } from "@chakra-ui/icons";

const AddButton = ({ user }: any) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const {
    isOpen: isOpenAuction,
    onOpen: onOpenAuction,
    onClose: onCloseAuction,
  } = useDisclosure();

  const [auctionData, setAuctionData] = useState({
    cropName: "",
    auctionTime: "",
    cropImage: null,
    bidPrice: 0,
  });

  const updateAuctionData = (e: any) => {
    if (e.target.name === "cropImage" && e.target.files[0]) {
      setAuctionData({
        ...auctionData,
        [e.target.name]: e.target.files[0],
      });
      return;
    }
    setAuctionData({
      ...auctionData,
      [e.target.name]: e.target.value,
    });
  };

  const createAuction = async (e: any) => {

    const cropName = auctionData.cropName;
    const userId = user._id;
    const expireTime = auctionData.auctionTime;
    const bidPrice = auctionData.bidPrice;
    const cropImage = auctionData.cropImage;

    console.log(cropName, userId, expireTime, bidPrice, cropImage);


    try {
      await axios.post("http://localhost:3000/api/v1/auction", {
        cropName,
        userId,
        expireTime,
        bidPrice,
        cropImage,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Auction Created Successfully");
      onCloseAuction();
    } catch (err) {
      toast.error("Error in creating Auction");
    }
  };

  const openAuction = () => {
    if (user) {
      onOpenAuction();
    }
  };

  return (
    <div>
      <Box position="fixed" bottom="5" right="5" zIndex={100}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Add"
            icon={<AddIcon />}
            variant="outline"
            colorScheme="white"
            transition="all 0.2s"
            borderRadius="10"
            color={"white"}
            borderWidth="0px"
            bg="blue.500"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          />
          <MenuList bg={"bg.gray.800"}>
            <MenuItem
              bg={"bg.gray.800"}
              icon={<CopyIcon />}
              onClick={openAuction}
            >
              Create Auction
            </MenuItem>
            {/* <MenuItem bg={"bg.gray.800"} icon={<EditIcon />} onClick={onOpenAuction}>
              Post Blog
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Box>

      {/* Modal for Auction */}
      <Modal onClose={onCloseAuction} isOpen={isOpenAuction} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className=" bg-gray-800 flex justify-center bg-opacity-100 shadow-lg text-white">
            <p className="text-3xl">Create Auction</p>
          </ModalHeader>
          <ModalCloseButton className="text-white" />
          <ModalBody className="space-y-2 bg-gray-800 bg-opacity-100 shadow-lg text-gray-900">
            <FormControl>
              <FormLabel color="white">Name:</FormLabel>
              <Input
                placeholder="Name"
                name="cropName"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Auction Time:</FormLabel>
              <Input
                type="datetime-local"
                name="auctionTime"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Bid Starting Price:</FormLabel>
              <Input
              placeholder="Price in Rupees"
                type="number"
                name="bidPrice"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>

              <FormLabel className="text-white">Add Image:</FormLabel>

              {auctionData.cropImage && (
                <div>
                  <img src={URL.createObjectURL(auctionData.cropImage)} className="w-20 h-20 rounded-md mx-auto my-2 " />
                </div>
              )}



              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 px-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop image</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" name="cropImage" onChange={updateAuctionData} />
                </label>
              </div>

            </FormControl>
          </ModalBody>
          <ModalFooter className=" bg-gray-800  bg-opacity-100 shadow-lg text-white">
            <Button colorScheme="teal" m={3} onClick={createAuction}>
              Create Auction
            </Button>
            <Button onClick={onCloseAuction}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddButton;