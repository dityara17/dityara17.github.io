(function() {
  var app, fnAddEventListener, fnRequestAnimationFrame;

  fnRequestAnimationFrame = function(fnCallback) {
    var fnAnimFrame;
    fnAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(fnCallback) {
      window.setTimeOut(fnCallback, 1000 / 60);
    };
    fnAnimFrame(fnCallback);
  };

  fnAddEventListener = function(o, sEvent, fn) {
    if (o.addEventListener) {
      o.addEventListener(sEvent, fn, false);
    } else {
      o['on' + sEvent] = fn;
    }
  };

  app = function() {
    var Particle, ctxRender, fPI, fnCos, fnNextFrame, fnRender, fnRnd, fnSetSize, fnSin, fnSwapList, fnTextFadeOut, h, nBody, oBuffer, oDoc, oRender, w;
    oDoc = document;
    nBody = oDoc.body;
    fPI = Math.PI;
    fnRnd = Math.random;
    fnCos = Math.cos;
    fnSin = Math.sin;
    fnTextFadeOut = function() {
      nValentinesText.setAttribute('class', 'happy-valentines');
    };
    setTimeout(fnTextFadeOut, 3000);
    ctxRender = nCanvasRender.getContext('2d');
    oRender = {
      pFirst: null
    };
    oBuffer = {
      pFirst: null
    };
    w = h = 0;
    fnSetSize = function() {
      nCanvasRender.width = w = window.innerWidth;
      nCanvasRender.height = h = 400;
      return {
        w: w,
        h: h
      };
    };
    fnSetSize();
    fnAddEventListener(window, 'resize', fnSetSize);
    fnSwapList = function(p, oSrc, oDst) {
      if (p != null) {
        if (oSrc.pFirst === p) {
          oSrc.pFirst = p.pNext;
          if (p.pNext != null) {
            p.pNext.pPrev = null;
          }
        } else {
          p.pPrev.pNext = p.pNext;
          if (p.pNext != null) {
            p.pNext.pPrev = p.pPrev;
          }
        }
      } else {
        p = new Particle();
      }
      p.pNext = oDst.pFirst;
      if (oDst.pFirst != null) {
        oDst.pFirst.pPrev = p;
      }
      oDst.pFirst = p;
      p.pPrev = null;
      return p;
    };
    Particle = (function() {
      var bIsDead;

      function Particle() {}

      Particle.prototype.fX = 0;

      Particle.prototype.fY = 0;

      Particle.prototype.fVX = 0;

      Particle.prototype.fVY = 0;

      Particle.prototype.aColor = [128, 0, 0, 1];

      Particle.prototype.pPrev = null;

      Particle.prototype.pNext = null;

      Particle.prototype.fGrowDuration = 100;

      Particle.prototype.fWaitDuration = 50;

      Particle.prototype.fShrinkDuration = 50;

      Particle.prototype.fRadiusCurrent = 0;

      Particle.prototype.fRadiusStart = 0;

      Particle.prototype.fRadiusMax = 10;

      Particle.prototype.fRadiusEnd = 0;

      Particle.prototype.iFramesAlive = 0;

      bIsDead = false;

      Particle.prototype.fAX = 0;

      Particle.prototype.fAY = 0;

      Particle.prototype.iDirection = 1;

      Particle.prototype.iPosition = 1;

      Particle.prototype.fnInit = function() {
        var fAngle, fForce, iRndColor, p;
        p = this;
        iRndColor = ~~(fnRnd() * 128);
        p.aColor = [128 + iRndColor, 0 + iRndColor, 0 + iRndColor, 1];
        fAngle = fnRnd() * fPI * 2;
        fForce = 1 + 0.5 * fnRnd();
        p.bIsDead = false;
        p.iPosition = fnRnd() < 0.5 ? 1 : -1;
        p.iFramesAlive = 0;
        p.fX = (w / 2) + 150 * p.iPosition;
        p.fY = 0;
        p.fVX = fForce * fnCos(fAngle);
        p.fVY = Math.sqrt(Math.abs(fForce * fnSin(fAngle)));
        if (p.iPosition === 1 && p.fVX > 0.4) {
          p.fVX -= 0.6;
        }
        if (p.iPosition === -1 && p.fVX < 0.4) {
          p.fVX += 0.6;
        }
        p.fGrowDuration = 80 + (2 * fnRnd() - 1) * 4;
        p.fWaitDuration = 60 + (2 * fnRnd() - 1) * 10;
        p.fShrinkDuration = 80 + (2 * fnRnd() - 1) * 10;
        p.fRadiusStart = 0.5;
        p.fRadiusMax = 0.5 + 4 * fnRnd();
        p.fRadiusEnd = 0;
        p.fRadiusCurrent = 0.5;
        p.fAX = 0;
        p.fAY = 0;
        p.iDirection = fnRnd() < 0.5 ? 1 : -1;
        p.iDirection = p.fVX > 0 ? 1 : -1;
        if ((p.iPosition === -1 && p.fVX < 0) || (p.iPosition === 1 && p.fVX > 0)) {
          p.fRadiusMax *= 2;
          p.fWaitDuration *= 3;
        }
      };

      Particle.prototype.fnUpdate = function() {
        var fForce, p;
        p = this;
        fForce = 0.0003 * fnRnd() * p.iDirection;
        if (p.iFramesAlive < p.fGrowDuration) {
          p.fAX += -fForce * p.fVY;
          p.fAY += fForce * p.fVX;
        }
        if (p.iFramesAlive > p.fGrowDuration + p.fWaitDuration) {
          p.fAX -= -fForce * p.fVY;
          p.fAY -= fForce * p.fVX;
        }
        p.fVX += p.fAX;
        p.fVY += p.fAY;
        p.fX += p.fVX;
        p.fY += p.fVY;
        p.iFramesAlive += 1;
        if (p.iFramesAlive < p.fGrowDuration) {
          p.fRadiusCurrent = (p.fRadiusMax - p.fRadiusStart) / p.fGrowDuration * p.iFramesAlive + p.fRadiusStart;
        } else if (p.iFramesAlive < p.fGrowDuration + p.fWaitDuration) {
          p.fRadiusCurrent = p.fRadiusMax;
        } else if (p.iFramesAlive < p.fGrowDuration + p.fWaitDuration + p.fShrinkDuration) {
          p.fRadiusCurrent = (p.fRadiusEnd - p.fRadiusMax) / p.fShrinkDuration * (p.iFramesAlive - p.fGrowDuration - p.fWaitDuration) + p.fRadiusMax;
        } else {
          p.bIsDead = true;
        }
        p.aColor[3] = 100 / (255 - p.iFramesAlive / 2);
        if ((p.fX + p.fRadiusCurrent < 0) || (p.fY + p.fRadiusCurrent < 0) || (p.fX > w - p.fRadiusCurrent) || (p.fY > h - p.fRadiusCurrent)) {
          p.bIsDead = true;
        }
        if (p.bIsDead === true) {
          fnSwapList(p, oRender, oBuffer);
        }
      };

      return Particle;

    })();
    fnRender = function() {
      var aData, iCount, iIndex, oImageData, p;
      oImageData = ctxRender.getImageData(0, 0, w, h);
      aData = oImageData.data;
      iIndex = 3;
      while (iIndex < aData.length) {
        aData[iIndex] -= 2;
        iIndex += 4;
      }
      ctxRender.putImageData(oImageData, 0, 0);
      p = oRender.pFirst;
      iCount = 0;
      while (p != null) {
        ctxRender.fillStyle = "rgba(" + p.aColor.join(',') + ")";
        ctxRender.beginPath();
        ctxRender.arc(p.fX, p.fY, Math.max(p.fRadiusCurrent, 0.01), 0, 2 * fPI, false);
        ctxRender.closePath();
        ctxRender.fill();
        p = p.pNext;
        iCount += 1;
      }
    };
    fnNextFrame = function() {
      var iAddParticle, iCount, p, pNext;
      iAddParticle = 0;
      iCount = 0;
      while (iAddParticle++ < 2) {
        p = fnSwapList(oBuffer.pFirst, oBuffer, oRender);
        p.fnInit();
      }
      p = oRender.pFirst;
      while (p != null) {
        pNext = p.pNext;
        p.fnUpdate();
        p = pNext;
        iCount++;
      }
      fnRender();
      return fnRequestAnimationFrame(function() {
        return fnNextFrame();
      });
    };
    fnNextFrame();
  };

  fnAddEventListener(window, 'load', app);

}).call(this);