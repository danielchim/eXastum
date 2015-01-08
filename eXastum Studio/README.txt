----BRIAN-MILLAR----SD2---------------------------------------------------------

Welcome to my project.

eXastum Studio is an HTML5 DAW (Digital Audio Workstation) designed to make
music production on the web simple for anyone.

This is not a finished product as I knew it wouldn't be. It's not possible to
produce a full music track with it yet but you can play back music and play the
simple piano oscillator. The reason I chose to build something so large that I
knew would not be fully complete is because I didn't want to make something I
would just throw away after the assignment was submitted, I wanted something I
could continue to work on.

In saying that all the code and features included now should work 100%, it is
complete in that sense, I just mean some features could not be added in time.

I've included the marking scheme document for you and commented as much code as
possible.

index.html is the main project file to open in Firefox.

macgril.js and music.js are my JS libraries

My macgril JS library contains more general purpose functions I use a lot and
music.js is specifically for this project.

three.js is a third party library I used to do the 3D canvas stuff, its needed
as webGL programming is thousands of lines of math whereas my three JS code is
only around 100 lines.

Thanks for taking the time to read this I hope it was helpful.

--------------------------------------------------------------------------------

PLEASE NOTE:

- Your machine will run louder and hotter while my website is open, do not worry
  this is just the 3D canvas running on the GPU. Its like having a 3D game open.

- I needed to use a 3D canvas rather than the 2D one covered in class as my
  visualizer needs to run in real time and the 2D canvas was rendering much too
  slowly without the hardware acceleration provided by the 3D canvas. With the
  GPU fired up the 3D canvas usually runs at 60fps or at least close to it.

--------------------------------------------------------------------------------
