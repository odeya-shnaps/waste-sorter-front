import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ImageState {
  images: File[];
  isUploading: boolean;
}

const initialState: ImageState = {
  images: [],
  isUploading: false,
};

// Define the async thunk for uploading images
export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async (files: File[]): Promise<File[]> => {
    // Simulate an API call or upload logic
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    return files; // Return uploaded files (replace with actual API response if applicable)
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
        state.images = [...state.images, ...action.payload];
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
