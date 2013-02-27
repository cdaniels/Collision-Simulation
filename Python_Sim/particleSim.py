#!/usr/bin/env python
"""
particleSim.py
engine for simulating real-time collisions of an
n particle system using pyglet and pyopengl

---------------------------
some code taken from examples at www.pyglet.org
coded by Chad Daniels on 1/8/2013
"""

import pyglet as pl
#pl.options['debug_gl'] = False
from pyglet.gl import *
from pyglet.gl.glu import * 
from pyglet import image #<==for image calls
from pyglet.window import key #<==for key constants
from numpy import array,subtract,add,multiply,dot,linalg
from scipy import spatial
from random import uniform
from OpenGL.GLUT import * #<==Needed for GLUT calls


from drawables import CollisionBox,Particle,Rectangle,TextWidget

class World(pl.window.Window):
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def __init__(self, *args, **kwargs):
        config = Config(sample_buffers=1, samples=4,
                        depth_size=16, double_buffer=True,)
        try:
            super(World, self).__init__(resizable=True, config=config, caption='Collisions')
        except:
            super(World, self).__init__(resizable=True , caption='Collisions')
        self.pos_array = []
        self.vel_array = []
        self.setup()

    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def setup(self):
        self.width = 640
        self.height = 480
        self.batch = pl.graphics.Batch()
        self.boxSize = 2.0
        self.ballNumber = 100 # initial parameters
        self.ballSize = 0.3
        self.collisionNumber = 0

        #-----------------------------------------#
        self.labels = [
            pl.text.Label('Ball Number: '+str(self.ballNumber), x=10, y=100,
                              anchor_y='bottom',color=(0, 0, 0, 255), batch=self.batch),
            pl.text.Label('Ball Size: '+str(self.ballSize), x=10, y=60,
                              anchor_y='bottom',color=(0, 0, 0, 255), batch=self.batch),
            pl.text.Label('Box Size: '+str(self.boxSize), x=10, y=20,
                              anchor_y='bottom',color=(0, 0, 0, 255), batch=self.batch),
            pl.text.Label('Collision Number: '+str(self.collisionNumber), x=10, y=140,
                              anchor_y='bottom',color=(0, 0, 0, 255), batch=self.batch)]
        """
        self.widgets = [
            TextWidget('', 150, 100, 50, self.batch),
            TextWidget('', 150, 60, 50, self.batch),
            TextWidget('', 150, 20, 50, self.batch)
        ]
        self.text_cursor = self.get_system_mouse_cursor('text')
        
        self.focus = None
        self.set_focus(self.widgets[0])
        """
        #-----------------------------------------#
        
        self.box = CollisionBox(array([0.0,0.0,-7.0]),self.boxSize)
        #self.radius = 1
        #self.pos_array =[]
        #self.vel_array =[]
        #self.ballList = []
        for i in range(self.ballNumber):
            rval = self.boxSize/1.5
            randVec = array([uniform(-rval,rval),uniform(-rval,rval),uniform(-rval,rval)])
            start_vel = randVec*.02
            #start_vel = 0.0
            #self.ballList.append(Particle(randVec,start_vel,self.ballSize))
            self.pos_array.append(randVec)
            self.vel_array.append(start_vel)
            

        self.InitGL(self.width, self.height)
        
        pl.clock.schedule_interval(self.update, 1/60.0) # update at 60Hz
        self.fps_display = pl.clock.ClockDisplay()
        
    
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # A general OpenGL initialization function.  Sets all of the initial parameters.
    def InitGL(self,Width, Height):             # We call this right after our OpenGL window is created.
        glClearColor(1.0, 1.0, 1.0, 1.0)       # This Will Clear The Background Color To Black
        glClearDepth(1.0)                         # Enables Clearing Of The Depth Buffer
        glDepthFunc(GL_LESS)                      # The Type Of Depth Test To Do
        glEnable(GL_DEPTH_TEST)                 # Enables Depth Testing
        glEnable (GL_LIGHTING);
        glEnable (GL_LIGHT0);
        glShadeModel(GL_SMOOTH)             # Enables Smooth Color Shading
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()                          # Reset The Projection Matrix
                                                    # Calculate The Aspect Ratio Of The Window
        #(pyglet initializes the screen so we ignore this call)
        #gluPerspective(45.0, float(Width)/float(Height), 0.1, 100.0)
        glMatrixMode(GL_MODELVIEW)
    
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # The function called when our window is resized (which shouldn't happen if you enable fullscreen, below)
    def ReSizeGLScene(self,Width, Height):
        if Height == 0:                           # Prevent A Divide By Zero If The Window Is Too Small
              Height = 1
        glViewport(0, 0, Width, Height)     # Reset The Current Viewport And Perspective Transformation
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()
        gluPerspective(45.0, float(Width)/float(Height), 0.1, 100.0)
        glMatrixMode(GL_MODELVIEW)
        #self.label.draw()
    
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # The main drawing function.
    def DrawGLScene(self):
        pl.gl.glClearColor(1, 1, 1, 1)
        #self.clear()
        
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); # Clear The Screen And The Depth Buffer
        glTranslatef(0,0,0)
        glLoadIdentity()
        
        self.box.drawBox()
        self.drawBalls()
        self.drawOverlay()

        
    #load 2d overlay then convert back to 3d view
    def drawOverlay(self):
        height = self.height
        width = self.width
        
        gl.glMatrixMode(gl.GL_PROJECTION)
        gl.glPushMatrix()
        gl.glLoadIdentity()
        gl.glOrtho(0, width, 0, height, -1, 1)
        gl.glMatrixMode(gl.GL_MODELVIEW)
        gl.glPushMatrix()
        gl.glLoadIdentity()
        
        ####draw stuff here####
        glTranslatef(0,height-160,0)
        self.batch.draw()
        gl.glLoadIdentity()
        glTranslatef(width-140,0,0)
        self.fps_display.draw()

        gl.glPopMatrix()
        gl.glMatrixMode(gl.GL_PROJECTION)
        gl.glPopMatrix()
        gl.glMatrixMode(gl.GL_MODELVIEW)
        
    
    def drawParticle(self,position):
        #Set position
        glTranslatef(position[0],position[1],position[2])
        
        #Draw sphere
        glColor3f(0.0,0.0,0.5)
        sphere = gluNewQuadric()
        gluSphere(sphere,self.ballSize,10,10)

    def drawBalls(self):
       # for i in range(len(self.ballList)):
        for i in range(self.ballNumber):     
            glLoadIdentity()
            glTranslatef(self.box.getPosition()[0],\
                         self.box.getPosition()[1],\
                         self.box.getPosition()[2])
            xtot,ytot,ztot = self.box.getRotation() # get box rotation to cancel it out
            glRotatef(xtot,1.0,0.0,0.0)       # Rotate on X
            glRotatef(ytot,0.0,1.0,0.0)       # Rotate on Y 
            glRotatef(ztot,0.0,0.0,1.0)       # Rotate on Z
            
           # iball = self.ballList[i]
            #ipos = iball.getPosition()
            ipos = self.pos_array[i]
            ivel = self.vel_array[i]
            
            self.drawParticle(ipos)
            #iball.update()
            ipos += ivel
            
            #collision detection
            bound = self.boxSize
            if (ipos[0] - self.ballSize <= -bound)or(ipos[0] + self.ballSize >= bound):
                #iball.velocity[0] *= -1
                ivel[0] *= -1
            if (ipos[1] - self.ballSize <= -bound)or(ipos[1] + self.ballSize >= bound):
                #iball.velocity[1] *= -1
                ivel[1] *= -1
            if (ipos[2] - self.ballSize <= -bound)or(ipos[2] + self.ballSize >= bound):
                #iball.velocity[2] *= -1
                ivel[2] *= -1

            
            # ball-ball collisions
           # for j in range(len(self.ballList)):
            for j in range(self.ballNumber):
                #jball = self.ballList[j]
                if (i != j):
                    self.resolveCollisions(i,j)

    def resolveCollisions(self,i,j):
        #iball = ball_1
        #ipos = iball.getPosition()
        #ivel = iball.getVelocity()
        #jball = ball_2
        #jpos = jball.getPosition()
        #jvel = jball.getVelocity()
        ipos = self.pos_array[i]
        ivel = self.vel_array[i]
        jpos = self.pos_array[j]
        jvel = self.vel_array[j]
        
        diameter = self.ballSize*2
        seperation = spatial.distance.euclidean(ipos, jpos)
        
        if seperation <= diameter:
            #collision vector
            collisionV = subtract(ipos,jpos)
            ncollisionV = collisionV/linalg.norm(collisionV)
            iInit = dot(ivel,ncollisionV)
            jInit = dot(jvel,ncollisionV)

            #momentum exchange
            iFin = jInit
            jFin = iInit
            iDiff = iFin - iInit
            jDiff = jFin - jInit
            iProj = multiply(ncollisionV,iDiff)
            jProj = multiply(ncollisionV,jDiff)
            newi = add(ivel,iProj)
            newj = add(jvel,jProj)
            #iball.setVelocity(newi)
            #jball.setVelocity(newj)
            self.vel_array[i] = newi
            self.vel_array[j] = newj

            #increment collision number
            self.collisionNumber+=1
            self.labels[3].text = "Collisions: " + str(self.collisionNumber)
    

    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def update(self,dt):
        self.DrawGLScene()

    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def on_draw(self):
        self.DrawGLScene()
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    def on_resize(self,w,h):
        self.ReSizeGLScene(w,h)
    
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def on_key_press(self, symbol, modifiers):
        rotspeed = .5
        if symbol == key.ESCAPE:
            self.dispatch_event('on_close')
            pl.app.exit()
        elif symbol == key.LEFT:
            self.box.rotateBox(0.0,-rotspeed,0.0)
        elif symbol == key.RIGHT:
            self.box.rotateBox(0.0,rotspeed,0.0)
        elif symbol == key.UP:
            self.box.rotateBox(-rotspeed,0.0,0.0)
        elif symbol == key.DOWN:
            self.box.rotateBox(rotspeed,0.0,0.0)
        """
        elif symbol == pl.window.key.TAB:
            if modifiers & pl.window.key.MOD_SHIFT:
                dir = -1
            else:
                dir = 1

            if self.focus in self.widgets:
                i = self.widgets.index(self.focus)
            else:
                i = 0
                dir = 0

            self.set_focus(self.widgets[(i + dir) % len(self.widgets)])
        """

    def on_key_release(self, symbol, modifiers):
        if symbol == key.LEFT or key.RIGHT:
            self.box.rotateY(0.0)
        if symbol == key.UP or key.DOWN:
            self.box.rotateX(0.0)
            #self.box.rotateZ(0.0)
    """
    #####################################################
    def on_mouse_motion(self, x, y, dx, dy):
        for widget in self.widgets:
            if widget.hit_test(x, y):
                print "hit"
                self.set_mouse_cursor(self.text_cursor)
                break
        else:
            self.set_mouse_cursor(None)

    def on_mouse_press(self, x, y, button, modifiers):
        for widget in self.widgets:
            if widget.hit_test(x, y):
                self.set_focus(widget)
                break
        else:
            self.set_focus(None)

        if self.focus:
            self.focus.caret.on_mouse_press(x, y, button, modifiers)

    def on_mouse_drag(self, x, y, dx, dy, buttons, modifiers):
        if self.focus:
            self.focus.caret.on_mouse_drag(x, y, dx, dy, buttons, modifiers)

    def on_text(self, text):
        if self.focus:
            self.focus.caret.on_text(text)

    def on_text_motion(self, motion):
        if self.focus:
            self.focus.caret.on_text_motion(motion)
      
    def on_text_motion_select(self, motion):
        if self.focus:
            self.focus.caret.on_text_motion_select(motion)

    def set_focus(self, focus):
        if self.focus:
            self.focus.caret.visible = False
            self.focus.caret.mark = self.focus.caret.position = 0

        self.focus = focus
        if self.focus:
            self.focus.caret.visible = True
            self.focus.caret.mark = 0
            self.focus.caret.position = len(self.focus.document.text)
    ##################################################################
    """


##################################main
if __name__ == "__main__":
    window = World()
    pl.app.run()

