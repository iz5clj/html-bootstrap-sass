# HTML with bootstrap and sass workflow

## Bower
We will use bower to install bootstrap, jquery and any other framework or library.
Bower normly installs all the downloaded components in "bower_components".
I prefer to use another (shorter) name for this directory.
We can do that by creating a file ".bowerc" and defining a variable called "directory" with the new name:
{
  "directory": "bc"
}
