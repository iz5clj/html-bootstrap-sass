# HTML bootstrap and sass workflow with gulp

## Bower
We will use [bower](http://bower.io) to install bootstrap, jquery and any other framework or library.
Bower normly installs all the downloaded components in `bower_components`.
I prefer to use another (shorter) name for this directory.
We can do that by creating a file `.bowerc` and defining a variable called `directory` with the new name:
```json
{
  "directory": "bc"
}
```
