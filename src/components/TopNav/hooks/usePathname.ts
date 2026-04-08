interface IProps {
  pathnames: string;
}

const usePathname = (props: IProps) => {
  const { pathnames } = props;
  const pathname = pathnames
    .substring(1)
    .split('/')
    .filter((item, index) => index !== 0);
  const lastPathname = pathname[pathname.length - 1];
  const pathnameWithoutLast = pathname.slice(0, pathname.length - 1);
  return {
    pathname,
    lastPathname,
    pathnameWithoutLast,
  };
};

export default usePathname;
