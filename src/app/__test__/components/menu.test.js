import { wrapTestToProvider } from '../../wrapTestToProviders';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Menu from '../../components/menu';

describe('Меню', () => {
    let history = createMemoryHistory();
    let props = {};

    beforeEach(() => {
        render(
            wrapTestToProvider(Menu, history, props)
        )
    });

    it('Меню рендерится', () => {
        const menu = screen.getByTestId('menu');
        expect(menu).toBeInTheDocument();
    });

    it('Клик по профилю редиректит на соответствующую страницу', () => {
        const profileLink = screen.getByText('Профиль');
        fireEvent.click(profileLink);
        expect(history.location.pathname).toBe('/profile');
    });

    it('Клик по карте редиректит на соответствующую страницу', () => {
        const profileLink = screen.getByText('Карта');
        fireEvent.click(profileLink);
        expect(history.location.pathname).toBe('/map');
    });
});
