import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ImageState {
  images: File[];
  isUploading: boolean;
}

const initialState: ImageState = {
  images: [],
  isUploading: false,
};

// Define a type for the API response (adjust according to your API structure)
type ApiResponse = {
  success: boolean;
  message: string;
  data: File[];
};

// Define the async thunk for uploading images
export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async (files: File[]): Promise<ApiResponse> => {
    try {
      // Create a FormData object to send the files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("image", file); // 'images' is the key expected by the backend
      });
      // Send a POST request to the server
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data: ApiResponse = await response.json();
      console.log(`result: ${data.message}`);
      return data;
    } catch (err) {
      // Handle and log the error
      console.error("Failed to upload images:", err);
      throw err; // Rethrow the error to let Redux handle it
    }
  },
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImages: (state, action: PayloadAction<File[]>) => {
      state.images = [...state.images, ...action.payload];
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.images = [...state.images, ...action.payload.data];
        state.isUploading = false;
      })
      .addCase(uploadImages.rejected, (state) => {
        state.isUploading = false;
      });
  },
});

export const selectIsUploading = (state: RootState) => state.image.isUploading;
export const { addImages, clearImages } = imageSlice.actions;
export default imageSlice.reducer;

/*
export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async (files: File[]): Promise<File[]> => {
    try {
      // Simulate an API call or upload logic
      const res = await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      return res;
    } catch (err: Error) {
      console.log(er);
    }
    // Return uploaded files (replace with actual API response if applicable)
  },
);*/
