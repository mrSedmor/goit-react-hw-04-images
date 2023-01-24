import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <MagnifyingGlass
      height="60"
      width="60"
      ariaLabel="MagnifyingGlass-loading"
      wrapperClass={css.wrapper}
      glassColor="#0000001b"
      color="#000000"
    />
  );
}
