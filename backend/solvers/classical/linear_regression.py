
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

def solve(data):
    """
    Performs a simple linear regression.
    
    Args:
        data (dict): A dictionary containing:
            - 'independent_variables': A list of lists (or numpy array) of feature data (X).
            - 'dependent_variable': A list (or numpy array) of target data (y).
            
    Returns:
        dict: A dictionary containing the model's coefficients, intercept, and R-squared value.
    """
    try:
        X = np.array(data['independent_variables'])
        y = np.array(data['dependent_variable'])

        if X.ndim == 1:
            X = X.reshape(-1, 1)
            
        if len(X) != len(y):
            return {
                'status': 'error',
                'message': 'Input arrays must have the same number of samples.'
            }

        model = LinearRegression()
        model.fit(X, y)
        
        y_pred = model.predict(X)
        r2 = r2_score(y, y_pred)

        return {
            'status': 'success',
            'result': {
                'coefficients': model.coef_.tolist(),
                'intercept': model.intercept_,
                'r_squared': r2,
                'summary': f"Model fitted with R-squared of {r2:.4f}."
            }
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'message': f"An error occurred during solving: {str(e)}"
        }
