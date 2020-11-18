export default (className, props) => {
    const { mods } = props;

    return mods ? `${className} ${mods}` : className;
};
