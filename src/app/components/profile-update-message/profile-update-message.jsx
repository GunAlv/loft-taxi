import React from 'react';
import PropTypes from 'prop-types';
import { ProfileAction, ProfileDescription, ProfileIntro } from '../profile/style';
import Button from '@material-ui/core/Button';
import { Title } from '../title/style';

const propTypes = {
    removeSuccessInfo: PropTypes.func.isRequired,
};

const ProfileUpdateMessage = ({ removeSuccessInfo }) => (
    <>
        <ProfileIntro>
            <Title variant="h1" component="h1">
                Профиль
            </Title>
            <ProfileDescription>
                Платёжные данные обновлены. Теперь вы можете заказывать такси.
            </ProfileDescription>
        </ProfileIntro>

        <ProfileAction>
            <Button
                variant="contained"
                onClick={removeSuccessInfo}
            >
                Перейти на карту
            </Button>
        </ProfileAction>
    </>
);

ProfileUpdateMessage.propTypes = propTypes;

export default ProfileUpdateMessage;
