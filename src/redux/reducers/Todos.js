import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getTodos = createAsyncThunk(
    '/todos/getTodos',
    async function(obj,{rejectWithValue}) {
        try {
            let response = await fetch(`https://638497543fa7acb14ff9c4a9.mockapi.io/api/todos`);
            if(!response.ok){
                throw new Error('SERVER ERROR!!!');
            }
            let data = await response.json();
            return data;
        } 
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const asyncPostTodo = createAsyncThunk(
    '/todos/asyncPostTodo',
    async function(elem,{rejectWithValue,dispatch}) {
        try {
            let response = await fetch(`https://638497543fa7acb14ff9c4a9.mockapi.io/api/todos`,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(elem),
            },);
            console.log(elem)
            let data = await response.json();
            elem.id = data[data.length-1].id +1;
            console.log(elem)
            if(!response.ok){
                throw new Error('Can\'t post todo!!!');
            };
            dispatch(postTodo(elem));
        } 
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const asyncDeleteTodo = createAsyncThunk(
    '/todos/asyncDeleteTodo',
    async function(elem,{rejectWithValue,dispatch}) {
        try {
            let response = await fetch(`https://638497543fa7acb14ff9c4a9.mockapi.io/api/todos/${elem.id}/`,{method:'DELETE'});
            if(!response.ok){
                throw new Error('Can\'t delete todo!!!');
            };
            dispatch(deleteTodo(elem.index));
        } 
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const asyncCheckTodo = createAsyncThunk(
    '/todos/asyncCheckTodo',
    async function(elem,{rejectWithValue,dispatch}) {
        try {
            let response = await fetch(`https://638497543fa7acb14ff9c4a9.mockapi.io/api/todos/${elem.id}`,{
                method:"PUT",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(elem),
            },);
            if(!response.ok){
                throw new Error('Can\'t check todo!!!');
            };
            dispatch(checkTodo(elem));
        } 
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const asyncEditTodo = createAsyncThunk(
    '/todos/asyncEditTodo',
    async function(obj,{rejectWithValue,dispatch}) {
        try {
            console.log(555)
            let response = await fetch(`https://638497543fa7acb14ff9c4a9.mockapi.io/api/todos/${obj.id}`,{
                method:"PUT",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(obj),
            },);
            dispatch(editTodo(obj));
            if(!response.ok){
                throw new Error('Can\'t edit todo!!!');
            };
        } 
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) =>{
    state.status = 'rejected';
    state.error = action.payload;
};

const slice = createSlice({
    name:'todos',
    initialState:({
        todos:[],
        status:null,
        error:null,
    }),
    reducers:({
        postTodo:(state, action)=>{
            state.todos.push(action.payload);
        },
        deleteTodo:(state, action)=>{
            state.todos.splice(action.payload,1);
        },
        checkTodo: (state, action) =>{
            state.todos.map((e)=> {if(e.id==action.payload.id){e.isComplited = action.payload.isComplited}});
        },
        editTodo: (state, action) =>{
            let { payload } = action;
            state.todos.map((e)=> {
                if(e.id == payload.id){
                    e.title1 = payload.title1
                };
            });
        },
    }),
    extraReducers:({
        [getTodos.pending]: (state, action) =>{
            state.status = 'loading';
            state.error = null;
        },
        [getTodos.fulfilled]: (state, action) =>{
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [getTodos.rejected]: (state, action) =>{
            state.status = 'rejected';
            state.error = action.payload;
        },
        [asyncDeleteTodo.rejected]: setError,
        [asyncCheckTodo.rejected]: setError,
        [asyncEditTodo.rejected]: setError,
    }),
})

export const { postTodo, deleteTodo, checkTodo, editTodo } = slice.actions;

export default slice.reducer;