let currentUnit = 'metric';

        function setUnit(unit) {
            currentUnit = unit;
            const buttons = document.querySelectorAll('.unit-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            if (unit === 'metric') {
                document.getElementById('weightUnit').textContent = 'kg';
                document.getElementById('heightUnit').textContent = 'cm';
                document.getElementById('weight').placeholder = 'Enter your weight';
                document.getElementById('height').placeholder = 'Enter your height';
            } else {
                document.getElementById('weightUnit').textContent = 'lbs';
                document.getElementById('heightUnit').textContent = 'inches';
                document.getElementById('weight').placeholder = 'Enter your weight';
                document.getElementById('height').placeholder = 'Enter your height';
            }

            document.getElementById('weight').value = '';
            document.getElementById('height').value = '';
            document.getElementById('result').classList.remove('show');
        }

        function calculateBMI() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);

            if (!weight || !height || weight <= 0 || height <= 0) {
                alert('Please enter valid weight and height values');
                return;
            }

            let bmi;
            if (currentUnit === 'metric') {
                bmi = weight / Math.pow(height / 100, 2);
            } else {
                bmi = (weight / Math.pow(height, 2)) * 703;
            }

            displayResult(bmi);
        }

        function displayResult(bmi) {
            const result = document.getElementById('result');
            const bmiValue = document.getElementById('bmiValue');
            const bmiCategory = document.getElementById('bmiCategory');
            const bmiDescription = document.getElementById('bmiDescription');

            bmiValue.textContent = bmi.toFixed(1);

            result.className = 'result show';

            if (bmi < 18.5) {
                result.classList.add('underweight');
                bmiCategory.textContent = 'Underweight';
                bmiDescription.textContent = 'You may need to gain weight. Consider consulting a healthcare provider for personalized advice.';
            } else if (bmi >= 18.5 && bmi < 25) {
                result.classList.add('normal');
                bmiCategory.textContent = 'Normal Weight';
                bmiDescription.textContent = 'Great! You have a healthy weight. Maintain it through balanced diet and regular exercise.';
            } else if (bmi >= 25 && bmi < 30) {
                result.classList.add('overweight');
                bmiCategory.textContent = 'Overweight';
                bmiDescription.textContent = 'Consider adopting a healthier lifestyle with balanced nutrition and regular physical activity.';
            } else {
                result.classList.add('obese');
                bmiCategory.textContent = 'Obese';
                bmiDescription.textContent = 'Your health may be at risk. Please consult a healthcare provider for guidance and support.';
            }
        }

        
        