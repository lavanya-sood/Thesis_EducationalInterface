import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import useStyles from './styles.js';
import './style.css';

export default function Editor(props) {
  const classes = useStyles();

  const {
    language,
    value,
    onChange
  } = props

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
      <ControlledEditor
        onBeforeChange={handleChange}
        className={classes.htmlControl}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />

  )
}