        // Respuestas correctas
        const correctAnswers = {
            1: "amazonas",
            2: "1969",
            3: "aluminio",
            4: "suecia",
            5: "hidrogeno",
            6: "pacífico",
            7: "australia"
        };
        
        let currentQuestion = 1;
        let correctCount = 0;
        
        // Inicializar indicadores de nivel
        function initLevelIndicators() {
            const indicator = document.getElementById('levelIndicator');
            
            for (let i = 1; i <= 7; i++) {
                const dot = document.createElement('div');
                dot.className = 'level-dot';
                dot.id = `levelDot${i}`;
                if (i === 1) dot.classList.add('active');
                indicator.appendChild(dot);
            }
        }
        
        // Verificar respuesta
        function checkAnswer(questionNum) {
            const answerInput = document.getElementById(`answer${questionNum}`);
            const feedback = document.getElementById(`feedback${questionNum}`);
            const userAnswer = answerInput.value.trim().toLowerCase();
            
            if (userAnswer === '') {
                feedback.textContent = "Por favor, escribe una respuesta.";
                feedback.className = "feedback error";
                feedback.style.display = 'block';
                return;
            }
            
            if (userAnswer === correctAnswers[questionNum]) {
                // Respuesta correcta
                feedback.textContent = "¡Respuesta correcta!";
                feedback.className = "feedback success";
                feedback.style.display = 'block';
                
                // Deshabilitar entrada y botón
                answerInput.disabled = true;
                document.querySelector(`#question${questionNum} .submit-btn`).disabled = true;
                
                // Mostrar video
                document.getElementById(`videoContainer${questionNum}`).style.display = 'block';
                
                // Mostrar botón siguiente si no es la última pregunta
                if (questionNum < 7) {
                    document.querySelector(`#videoContainer${questionNum} .next-btn`).style.display = 'block';
                }
                
                // Actualizar contador
                correctCount++;
                document.getElementById('correctCount').textContent = correctCount;
                
                // Actualizar progreso
                const progress = (correctCount / 7) * 100;
                document.getElementById('progressBar').style.width = `${progress}%`;
                
                // Actualizar indicadores de nivel
                document.getElementById(`levelDot${questionNum}`).classList.remove('active');
                document.getElementById(`levelDot${questionNum}`).classList.add('completed');
                
                // Mostrar mensaje de finalización si se completaron todas
                if (correctCount === 7) {
                    document.getElementById('completionMessage').style.display = 'block';
                }
            } else {
                // Respuesta incorrecta
                feedback.textContent = "Respuesta incorrecta. Intenta de nuevo.";
                feedback.className = "feedback error";
                feedback.style.display = 'block';
            }
        }
        
        // Avanzar a la siguiente pregunta
        function nextQuestion(currentNum) {
            // Ocultar pregunta actual y video
            document.getElementById(`question${currentNum}`).classList.remove('active');
            document.getElementById(`videoContainer${currentNum}`).style.display = 'none';
            
            // Mostrar siguiente pregunta
            const nextNum = currentNum + 1;
            document.getElementById(`question${nextNum}`).classList.add('active');
            
            // Actualizar indicadores de nivel
            document.getElementById(`levelDot${nextNum}`).classList.add('active');
        }
        
        // Inicializar la página
        window.onload = function() {
            initLevelIndicators();
        };