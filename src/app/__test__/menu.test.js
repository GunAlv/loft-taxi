import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../common/providers/auth-provider';
import Menu from '../components/menu';

describe('Меню', () => {
    let mockOnChangePage = jest.fn();
    let logout = jest.fn();

    beforeEach(() => {
        render(
            <AuthContext.Provider
                value={{logout}}
            >
                <AuthContext.Consumer>
                    {
                        value => {
                            return (
                                <Menu
                                    onChangePage={mockOnChangePage}
                                />
                            );
                        }
                    }
                </AuthContext.Consumer>
            </AuthContext.Provider>
        );
    });

    it('Меню рендерится', () => {
        const menu = screen.getByTestId('menu');
        expect(menu).toBeInTheDocument();
    });

    it('Клик по кнопке навигации вызывает функцию редиректа', () => {
        const MapLink = screen.getByText('Карта');
        fireEvent.click(MapLink);
        expect(mockOnChangePage).toHaveBeenCalled();
    });

    it('Клик по "Выйти" вызывает функцию логаута', () => {
        const MapLink = screen.getByText('Выйти');
        fireEvent.click(MapLink);
        expect(logout).toHaveBeenCalled();
    });
});
