import { Select } from '@shopify/polaris';
import { useState, useCallback, memo } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { useDispatch } from 'react-redux';
import { fetchAllAttributes, fetchAllCategories } from '../Toolkit/slicer';

function SelectTab({ label, data, index }) {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('');

  // handle select change
  const handleSelectChange = useCallback((value) => {
    if (value == -1)
      return ''
    let prev = value
    value = JSON.parse(value)
    let path = 'Amazon';
    value.full_path.map(x => { path += "/" + x });
    (value.has) ? dispatch(fetchAllCategories({ data: value.val, index: index, full_path: path })) : dispatch(fetchAllAttributes(value.attrData));
    setSelected(prev)
  }, []);

  // option data
  let options = data.map(x => { return { label: x.name, value: JSON.stringify({ key: x.name, val: x.parent_id, has: x.hasChildren, full_path: x.full_path, attrData: (!x.hasChildren) ? { browseNodeId: x.browseNodeId, category: x.category['primary-category'], subCategory: x.category['sub-category'] } : {} }) } })
  options = [{ label: 'Select ' + label, value: -1 }, ...options]


  return (
    <div className="mar">
      <Select
        label={label}
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    </div>
  );
}

export default memo(SelectTab)