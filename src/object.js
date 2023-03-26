import React from 'react';
import { objectStyle } from './style';


export class Object extends React.Component {
    render () {
        return (
            <img style = { objectStyle } src = {(this.props.objSrc) }/>
        )
    }
}