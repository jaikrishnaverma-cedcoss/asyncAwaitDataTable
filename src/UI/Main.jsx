import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../Toolkit/slicer';
import { useEffect } from 'react';
import SelectTab from './SelectTab';
import FormAttribute from './FormAttribute';
import {Toast} from '@shopify/polaris';

const Main = () => {

    const data = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(fetchAllCategories({ data: [], index: 0 })) }, [])
    
    // use for debuging purposes
    // console.log("REDUX STATE", data)

    return (
        <div className='main'>
            <h2>Categories Stacks</h2>
            <p className="mar">{data.full_path}</p>
            <div className="select">
                {
                    data.data.map((x, i) => {
                        return <SelectTab label={(i === 0) ? "Categories" : "Sub-categories"} data={(x) ? x : []} index={i} key={x + i} />
                    })

                }
                {
                    data.attr && <FormAttribute label={"Attribute"} data={data.attr} />
                }

                {
                    (data.loading) ? <div className='App'><img style={{ width: "75px" }} src="Double Ring-1s-200px.gif" /></div> : <p></p>
                }
                {data.toast&&<p className='toast'>Error Code: {data.toast}</p>}
            </div>
        </div>
    )
}

export default Main