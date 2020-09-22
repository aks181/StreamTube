import React from 'react';
import { BrowserRouter, Route  } from 'react-router-dom';

import Header from './Header';
import StreamCreate from './stream-components/StreamCreate';
import StreamEdit from './stream-components/StreamEdit';
import StreamList from './stream-components/StreamList';
import StreamDelete from './stream-components/StreamDelete';
import StreamShow from './stream-components/StreamShow';


const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit" exact component={StreamEdit} />
                <Route path="/streams/delete" exact component={StreamDelete} />
                <Route path="/streams/show" exact component={StreamShow} />
            </BrowserRouter>
        </div>
    );
}

export default App;