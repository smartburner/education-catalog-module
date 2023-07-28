import React from "react";
import Select, {SingleValue} from "react-select";
import {SelectOption} from "../models/selectOption.model";

interface IECFormSelectProps {
    name: string,
    id: string,
    options: SelectOption[] | undefined,
    isDisabled: boolean,
    getValueOnChange: (newValue: SingleValue<SelectOption>) => void,
    defaultValue?: SingleValue<SelectOption> | undefined
}

const ECFormSelect: React.FC<IECFormSelectProps> = (props) => {
    return (
        <Select
            id={props.id}
            onChange={newValue => props.getValueOnChange(newValue)}
            options={props.options}
            name={props.name}
            isDisabled={props.isDisabled}
            defaultValue={props.defaultValue}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    ":hover": {
                        borderColor: '#FF8A00'
                    },
                    borderColor: state.isFocused ? '#FF8A00' : '#C2C2C2',
                    boxShadow: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused || state.isSelected ? "#FF8A00" : "transparent",
                    color: state.isFocused || state.isSelected ? "#FFFFFF" : "#1A1A1A",
                    ":hover": {
                        backgroundColor: "#FF8A00",
                        color: "#ffffff"
                    },
                    ":active": {
                        backgroundColor: "#FF8A00",
                        color: "#ffffff"
                    },
                    cursor: "pointer"
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    marginLeft: 0,
                    marginRight: 0
                }),
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: "10px 14px"
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    margin: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                })
            }}
        />
    );
}

export default ECFormSelect;