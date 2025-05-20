// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho trạng thái của slice này
interface CounterState {
  value: number;
}

// Định nghĩa trạng thái ban đầu
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter", // Tên của slice. Đây sẽ là tiền tố cho các action type.
  initialState, // Trạng thái ban đầu
  reducers: {
    // Các reducer được định nghĩa ở đây.
    // Redux Toolkit sử dụng Immer để cho phép bạn "mutate" state một cách an toàn.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export các action creators được tạo tự động từ `createSlice`
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer mặc định cho slice này
export default counterSlice.reducer;
