export default function Image({src,...rest}) {
    if (typeof src === 'string' && src.startsWith('https://')) {
        return <img {...rest} src={src} alt={''} />;
    } else {
        const localSrc = 'http://localhost:4000/uploads/' + src;
        return <img {...rest} src={localSrc} alt={''} />;
    }
}