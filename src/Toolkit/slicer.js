import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// initial data
const initialState = {
    data: [],
    loading: true,
    toast: false,
    attr: false,
    full_path: ""
}

// slice
const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.toast = action.payload
            state.loading = false
        })
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = false
            state.toast = false
            state.attr = false
            state.full_path = action.payload.full_path
            state.data.splice(action.payload.index)
            state.data.push(action.payload.data)
        })
        builder.addCase(fetchAllAttributes.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllAttributes.rejected, (state, action) => {
            state.toast = action.payload
            state.loading = false
        })
        builder.addCase(fetchAllAttributes.fulfilled, (state, action) => {
            state.attr = [...action.payload]
            state.loading = false
            state.toast = false
        })
    }
})
export default mainSlice;



// Api call for fetch all categories API
export const fetchAllCategories = createAsyncThunk('mainSlice/fetchAllCategories',
    async ({ data, index, full_path = 'Amazon' }, control) => {

        let response = ''
        try{
        response = await fetch('https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/', {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530,
                "Ced-Target-Name": "amazon"
            },
            body: JSON.stringify(
                {
                    target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                    selected: data,
                    user_id: "63329d7f0451c074aa0e15a8",
                    target: {
                        marketplace: "amazon",
                        shopId: "530"
                    }
                })
        })

        response = await response.json()
    }
    catch(error){
        return control.rejectWithValue("Something wrong !")
    }
        // console.log('cat api', response)
        if (!response.success) {
            return control.rejectWithValue(response.message)
        }

        return { data: response.data, index: index + 1, full_path };
    }
)

// fetch Attributes
export const fetchAllAttributes = createAsyncThunk('mainSlice/fetchAllAttributes',
    async (type, control) => {
        let response=''
        try{
         response = await fetch('https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/', {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530,
                "Ced-Target-Name": "amazon"
            },
            body: JSON.stringify(
                {
                    target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                    user_id: "63329d7f0451c074aa0e15a8",
                    target: {
                        marketplace: "amazon",
                        shopId: "530"
                    },
                    data: {
                        barcode_exemption: false,
                        browser_node_id: type.browseNodeId,
                        category: type.category,
                        sub_category: type.subCategory,
                    }
                })
        });
        response = await response.json()
    }
    catch(error){
        return control.rejectWithValue("Something wrong !")
    }
        if (!response.success) {
            return control.rejectWithValue(response.message)
        }
        let data = []
        for (let item in response.data.Mandantory) {
            data.push(item)
        }
        // console.log('attr api', response)
        return data;
    }
)