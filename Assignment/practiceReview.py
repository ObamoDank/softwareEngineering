import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 20, 2)
y = np.arange(0, 30, 3)

a = np.arange(0, 20, 2)
b = np.arange(0, 30, 3)

plt.figure(1)
plt.subplot(211)
plt.plot(x, y)
plt.subplot(212)
plt.plot(x, y)

plt.figure(2)
plt.subplot(211)
plt.plot([1, 2, 3], [1, 4, 6])