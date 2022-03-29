import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import './index.css'
import {Provider} from './Context/Context'
import { SpeechProvider} from '@speechly/react-client'

ReactDOM.render(
<SpeechProvider appId="37e519dd-3f51-49a6-992a-e13434baa618" >
    <Provider>
    <App/>
    </Provider>
</SpeechProvider>
,document.querySelector('#root'))