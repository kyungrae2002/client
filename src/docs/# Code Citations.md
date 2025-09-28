# Code Citations

## License: GPL-3.0
https://github.com/italia/design-comuni-plone-theme/blob/051b973025ce68aceecc85cfc1d237ffa4121298/src/components/ItaliaTheme/ScrollToTop/ScrollToTop.jsx

```
{
  const [isVisible, setIsVisible] = useState(false
```


## License: MIT
https://github.com/kamiy2j/kamranshahid/blob/86d325044f07ad6a3e2bcc54dc10fe658fe551ad/src/components/scrolltotop.js

```
{
  const [isVisible, setIsVisible] = useState(false
```


## License: GPL-3.0
https://github.com/italia/design-comuni-plone-theme/blob/051b973025ce68aceecc85cfc1d237ffa4121298/src/components/ItaliaTheme/ScrollToTop/ScrollToTop.jsx

```
{
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
```


## License: MIT
https://github.com/kamiy2j/kamranshahid/blob/86d325044f07ad6a3e2bcc54dc10fe658fe551ad/src/components/scrolltotop.js

```
{
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
```


## License: GPL-3.0
https://github.com/italia/design-comuni-plone-theme/blob/051b973025ce68aceecc85cfc1d237ffa4121298/src/components/ItaliaTheme/ScrollToTop/ScrollToTop.jsx

```
{
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
```


## License: MIT
https://github.com/kamiy2j/kamranshahid/blob/86d325044f07ad6a3e2bcc54dc10fe658fe551ad/src/components/scrolltotop.js

```
{
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
```

