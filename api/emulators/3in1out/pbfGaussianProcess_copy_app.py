import numpy as np
from matplotlib import pyplot as plt
import pandas as pd

#from sklearn.preprocessing import StandardScaler as scale
from sklearn.preprocessing import MinMaxScaler
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C

np.random.seed(1)

data=pd.read_csv("api/emulators/3in1out/3in1out.csv")

Power=data.iloc[:,1].values
Speed=data.iloc[:,2].values
Layer=data.iloc[:,3].values
Width=data.iloc[:,4].values

Parameter=np.column_stack((Power, Speed, Layer))

Table=np.column_stack((Parameter,Width))

# print("Training Data: (Power, Speed, Layer, Width)")
# print(Table)

Speed_trial=[[200,1.25,75],[200,1.75,75],[200,2,75]]
Power_trial=[[160,1.5,75],[170,1.5,75],[180,1.5,75]]
Layer_trial=[[200,1.5,55],[200,1.5,60],[200,1.5,65]]
Combo_trial=[[160,1.25,55],[170,1.4,60],[180,1.75,65]]

Cross_val=[[175,1.5,75]]

scaler = MinMaxScaler()

Parameter_norm = scaler.fit_transform(Parameter)

Speed_trial_norm = scaler.transform(Speed_trial)
Power_trial_norm = scaler.transform(Power_trial)
Layer_trial_norm = scaler.transform(Layer_trial)
Combo_trial_norm = scaler.transform(Combo_trial)
Cross_val_norm = scaler.transform(Cross_val)

# Instantiate a Gaussian Process model
kernel = C(1.0, (1e-3, 1e3)) * RBF(10, (1e-2, 1e2))
gp = GaussianProcessRegressor(kernel=kernel, n_restarts_optimizer=15,normalize_y=True)

# Fit to data using Maximum Likelihood Estimation of the parameters
gp.fit(Parameter_norm, Width)

# parameters is input of Power Speed, Layer
emulator1 = lambda parameters: gp.predict(scaler.transform(parameters))