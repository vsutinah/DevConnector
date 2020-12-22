// Component that loads a loading GIF when pages are loading
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
)