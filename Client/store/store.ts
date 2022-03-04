import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import companySlice from './companySlice'
import jobSlice from './jobSlice'
import postSlice from './postSlice'
import profileSlice from './profileSlice'


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        profile: profileSlice.reducer,
        post: postSlice.reducer,
        company: companySlice.reducer,
        job: jobSlice.reducer
    }
})

export default store