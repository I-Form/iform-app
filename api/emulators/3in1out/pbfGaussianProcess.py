import numpy as np
from matplotlib import pyplot as plt
import pandas as pd

#from sklearn.preprocessing import StandardScaler as scale
from sklearn.preprocessing import MinMaxScaler
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C

np.random.seed(1)

data=pd.read_csv("3in1out.csv")

Power=data.iloc[:,1].values
Speed=data.iloc[:,2].values
Layer=data.iloc[:,3].values
Width=data.iloc[:,4].values

Parameter=np.column_stack((Power, Speed, Layer))

Table=np.column_stack((Parameter,Width))

print("Training Data: (Power, Speed, Layer, Width)")
print(Table)

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

#Width_predict, sigma = gp.predict(Parameter_test, return_std=True)
Speed_width_trial, sigma_trial = gp.predict(Speed_trial_norm, return_std=True)
Power_width_trial, sigma_dummy = gp.predict(Power_trial_norm, return_std=True)
Layer_width_trial, sigma_dummy = gp.predict(Layer_trial_norm, return_std=True)
Combo_width_trial, sigma_dummy = gp.predict(Combo_trial_norm, return_std=True)
Cross_val_width, sigma_dummy = gp.predict(Cross_val_norm, return_std=True)

print()
print("***** Cross validation Parameters: 175W, 1.5m/s, 75 microns *****")
print("Cross validation Width: 66.53 microns")
print("Cross validation Width Prediction: ", Cross_val_width, " microns")

Speed_results=np.column_stack((Speed_trial,Speed_width_trial))
Power_results=np.column_stack((Power_trial,Power_width_trial))
Layer_results=np.column_stack((Layer_trial,Layer_width_trial))
Combo_results=np.column_stack((Combo_trial,Combo_width_trial))
print()
print("Speed test results: (Power, Speed, Layer, Width)")
print(Speed_results)
print()
print("Power test results: (Power, Speed, Layer, Width)")
print(Power_results)
print()
print("Layer test results: (Power, Speed, Layer, Width)")
print(Layer_results)
print()
print("Combo test results: (Power, Speed, Layer, Width)")
print(Combo_results)
