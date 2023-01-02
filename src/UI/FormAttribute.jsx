
import { Form, Select, FormLayout, TextField, Button, ButtonGroup, DataTable, Page } from '@shopify/polaris';
import { useState, useEffect, memo } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { useSelector } from 'react-redux';
import { Card } from '@shopify/polaris';

function FormAttribute({ label, data, index }) {

  const [selected, setSelected] = useState('');
  const state = useSelector(state => state.reducer.attr)
  const [compState, setcompState] = useState({ active: false, table: [] });
  const [input, setInput] = useState({ key: '', val: '' });
  const handleInputChange = (value) => setInput({ ...input, val: value });
  
  // set all state to default
  useEffect(() => {
    setSelected('')
    setcompState({ active: false, table: [] })
    setInput({ key: '', val: '' })
  }, [state])

  // handle when selected value change
  const handleSelectChange = (value) => {
    compState.active = true
    input.key = value
    setcompState(compState)
    setSelected(value)
    setInput(input)
  }

  // form submit handler
  const handleFormSubmit = (event) => {
    input.val = event.target.val.value
    compState.table[input.key] = input.val
    compState.active = false
    setcompState(compState)
    setInput({ key: '', val: '' })
  }

  const options = data.map(x => { return { label: x, value: x } })

  return (
    <div className="mar">
      <Select
        label={label}
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
      <div className="mar">
        {
          compState.active && <Card title={`Set Attribute Value For ${input.key}`} sectioned>
            <Form onSubmit={handleFormSubmit}>
              <FormLayout>
                <TextField
                  value={input.val}
                  onChange={handleInputChange}
                  label=""
                  type="text"
                  autoComplete="text"
                  name="val"
                />

                <ButtonGroup>
                  <Button submit primary>Add</Button>
                </ButtonGroup>
              </FormLayout>
            </Form>
          </Card>


        }
        {
          (Object.entries(compState.table).length > 0) && <Page title="Sales by product">
            <Card>
              <DataTable
                columnContentTypes={[
                  'text',
                  'text',
                ]}
                headings={[
                  'Attribute',
                  'Value',
                ]}
                rows={[...Object.entries(compState.table)]}
              />
            </Card>
          </Page>
        }
      </div>
    </div>
  );
}

export default memo(FormAttribute)