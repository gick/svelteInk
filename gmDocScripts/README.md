# Helper scripts for using gm

The idea is to ease the use of gm from the client side.

For this we process the imageMagick html documentation file. For each method, a file is created and named as the method.

The first line of the file contains the method parameters, the following lines contains the documentation in plain text.

By looping over these file on the web app, we create a JSON array that is used to generate user interface.
