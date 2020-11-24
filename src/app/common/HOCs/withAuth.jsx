import React from 'react';
import { AuthContext } from '../providers/auth-provider';

export default function withAuth(Component) {
    return class extends React.Component {
        static displayName = 'withAuthConsumer';
        render() {
            return (
                <AuthContext.Consumer>
                    {
                        value => {
                            return (
                                <Component {...value} {...this.props} />
                            );
                        }
                    }
                </AuthContext.Consumer>
            );
        };
    };
};
