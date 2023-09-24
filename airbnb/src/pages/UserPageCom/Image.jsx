export default function Image({src,...rest}) {
    src = src && String(src).includes('https://')
        ? src
        : 'https://airshop-top-tan.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }