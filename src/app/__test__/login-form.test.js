import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../common/providers/auth-provider';
import LoginForm from '../components/login-form'

describe('Форма логина', () => {
    let mockOnChangePage = jest.fn();
    let login = jest.fn();

    beforeEach(() => {
        render(
            <AuthContext.Provider
                value={{login}}
            >
                <AuthContext.Consumer>
                    {
                        value => {
                            return (
                                <LoginForm
                                    onChangePage={mockOnChangePage}
                                />
                            );
                        }
                    }
                </AuthContext.Consumer>
            </AuthContext.Provider>
        );
    });

    it('Форма рендерится', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeTruthy();
    });

    it('Сабмит формы перенаправляет на страницу с картой', () => {
        const loginForm = screen.getByTestId('login-form');
        fireEvent.submit(loginForm);
        expect(mockOnChangePage).toHaveBeenCalled();
    });
});
