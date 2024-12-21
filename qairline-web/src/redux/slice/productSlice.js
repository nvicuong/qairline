import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllArticles = createAsyncThunk(
  "articles/fetchAllArticles",
  async () => {
    const response = await axios.get("http://localhost:8080/api/news/getAll");
    return response.data;
  }
);

// Tạo slice
const productSlice = createSlice({
  name: "articles",
  initialState: {
    data: [], // Lưu toàn bộ bài viết
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // Gán toàn bộ dữ liệu bài viết
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
