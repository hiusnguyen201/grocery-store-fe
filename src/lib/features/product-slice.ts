import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@/lib/services/product";
import { MetaData } from "@/types/meta";

type ProductState = {
  isLoading: boolean;
  error: any | null;
  deletedIds: string[];
  item: Product | null;
  list: Product[];
  meta: MetaData;
};

const initialState: ProductState = {
  isLoading: false,
  error: null,
  deletedIds: [],
  item: null,
  list: [],
  meta: {
    page: 1,
    limit: 0,
    totalCount: 0,
    offset: 0,
    totalPage: 0,
    isPrevious: false,
    isNext: false,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    getAll(
      state,
      action: PayloadAction<{ data: Product[]; meta: MetaData }>
    ) {
      state.list = action.payload.data;
      state.meta = action.payload.meta;
      state.error = null;
    },
    getOne(state, action: PayloadAction<Product>) {
      state.item = action.payload;
      state.error = null;
    },
    create(state, action: PayloadAction<Product>) {
      state.list.push(action.payload);
      state.error = null;
    },
    update(state, action: PayloadAction<Product>) {
      state.list.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    },
    remove(state, action: PayloadAction<Product>) {
      state.list = state.list.filter(
        (item) => item._id !== action.payload._id
      );
      state.deletedIds.push(action.payload._id);
      state.error = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  hasError,
  getAll,
  getOne,
  create,
  update,
  remove,
} = productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.getAllProducts();
    dispatch(getAll(data || []));
  } catch (e: any) {
    dispatch(hasError(e));
  } finally {
    dispatch(stopLoading());
  }
};
