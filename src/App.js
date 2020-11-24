import React from 'react';
import AuthProvider from '../src/app/common/providers/auth-provider';
import MainApp from '../src/app/components/main-app';

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <MainApp/>
            </AuthProvider>
        );
    };
}

export default App;
