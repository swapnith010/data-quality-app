import pandas as pd
import numpy as np

def analyze_data(df):
    report = {}

    # Basic info
    report['rows'] = df.shape[0]
    report['columns'] = df.shape[1]

    # Missing values
    missing = df.isnull().sum().to_dict()
    report['missing_values'] = missing

    # Duplicate rows
    duplicates = df.duplicated().sum()
    report['duplicates'] = int(duplicates)

    # Data types
    report['dtypes'] = df.dtypes.astype(str).to_dict()

    # Statistical summary
    report['summary'] = df.describe(include='all').fillna("").to_dict()

    # Outlier detection (IQR)
    outliers = {}
    for col in df.select_dtypes(include=np.number).columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        outlier_count = df[(df[col] < Q1 - 1.5*IQR) | (df[col] > Q3 + 1.5*IQR)].shape[0]
        outliers[col] = int(outlier_count)

    report['outliers'] = outliers

    # Quality Score
    total_cells = df.size
    missing_cells = df.isnull().sum().sum()

    completeness = (1 - missing_cells / total_cells) * 100
    uniqueness = (1 - duplicates / len(df)) * 100 if len(df) > 0 else 100

    score = (completeness + uniqueness) / 2

    report['quality_score'] = round(score, 2)

    return report