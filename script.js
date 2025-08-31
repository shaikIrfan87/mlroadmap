const planData = {
    phase1: {
        title: "Weeks 1–2: Core ML & Tools",
        intro: "This phase focuses on mastering the fundamentals of Machine Learning and the essential tools of the trade. Build a strong foundation here, as everything else will build upon these concepts.",
        categories: [
            { 
                title: "Python Refresher", 
                tasks: [
                    { id: "t1", text: "NumPy: Array manipulation, broadcasting" },
                    { id: "t2", text: "Pandas: DataFrames, data cleaning, manipulation" },
                    { id: "t3", text: "Matplotlib/Seaborn: Data visualization" },
                    { id: "t4", text: "Scikit-learn: Core APIs (fit, predict, transform)" }
                ]
            },
            { 
                title: "ML Basics",
                tasks: [
                    { id: "t5", text: "Linear & Logistic Regression" },
                    { id: "t6", text: "Decision Trees & Random Forests" },
                    { id: "t7", text: "K-Means Clustering" },
                    { id: "t8", text: "Core Concepts: Supervised vs. Unsupervised, Train/Test split, Evaluation Metrics" }
                ]
            },
            { 
                title: "SQL",
                tasks: [
                    { id: "t9", text: "Basic Queries: SELECT, FROM, WHERE" },
                    { id: "t10", text: "Joins: INNER JOIN, LEFT JOIN" },
                    { id: "t11", text: "Aggregations: GROUP BY, COUNT, SUM, AVG" },
                    { id: "t12", text: "Practice: LeetCode SQL Easy problems" }
                ]
            }
        ],
        deliverable: {
            title: "Mini-Project",
            text: "Choose one: House Price Prediction (Regression) or Titanic Survival Prediction (Classification)."
        }
    },
    phase2: {
        title: "Weeks 3–4: Deep Learning + Deployment",
        intro: "Dive into neural networks, the powerhouse behind modern AI. You'll not only learn to build deep learning models but also how to make them accessible to the world via deployment.",
        categories: [
            { 
                title: "Deep Learning Framework", 
                tasks: [
                    { id: "t13", text: "Choose & Learn: PyTorch or TensorFlow" },
                    { id: "t14", text: "Practice building basic neural networks" }
                ]
            },
            {
                title: "Deep Learning Architectures",
                tasks: [
                    { id: "t15", text: "CNNs for image tasks" },
                    { id: "t16", text: "RNN/LSTM basics for sequence data" },
                    { id: "t17", text: "Transformers: High-level overview" }
                ]
            },
            {
                title: "Deployment Basics",
                tasks: [
                    { id: "t18", text: "Web Framework: Flask or FastAPI" },
                    { id: "t19", text: "Version Control: Git & GitHub basics" },
                    { id: "t20", text: "Cloud Platform: Render, Heroku, or AWS free tier" }
                ]
            }
        ],
        deliverable: {
            title: "Project 1: Deployable Model",
            text: "Build an Image Classification Model (CIFAR-10 or custom dataset) and deploy it as a web app."
        }
    },
    phase3: {
        title: "Weeks 5–6: NLP + Real-World Project",
        intro: "Specialize in Natural Language Processing, one of the most exciting fields in ML. Apply your skills to understand and process human language, then build and deploy another practical application.",
        categories: [
            { 
                title: "NLP Basics", 
                tasks: [
                    { id: "t21", text: "Tokenization (Word, Sentence)" },
                    { id: "t22", text: "Embeddings (Word2Vec, GloVe concepts)" },
                    { id: "t23", text: "Text Classification" },
                    { id: "t24", text: "Hugging Face: Use the transformers library" }
                ]
            },
            {
                title: "Project Work",
                tasks: [
                    { id: "t25", text: "Optional: Improve a previous personal project" }
                ]
            }
        ],
        deliverable: {
            title: "Project 2: NLP Application",
            text: "Build one: Text Classification Chatbot, Sentiment Analysis tool, or a Resume Screener. Deploy the NLP model with an API endpoint."
        }
    },
    phase4: {
        title: "Weeks 7-8: Industry & Job Readiness",
        intro: "The final stretch! This phase is all about polishing your profile, understanding industry best practices, and preparing intensely for interviews to land your first ML role.",
        categories: [
            { 
                title: "Industry Readiness", 
                tasks: [
                    { id: "t26", text: "MLOps Awareness: Model versioning, basics of Docker" },
                    { id: "t27", text: "Participate in one Kaggle competition for exposure" },
                    { id: "t28", text: "Update Resume & LinkedIn with new projects and skills" }
                ]
            },
            {
                title: "Job Prep & Applications",
                tasks: [
                    { id: "t29", text: "Revise ML concepts (bias-variance, overfitting, etc.)" },
                    { id: "t30", text: "Practice Python/SQL coding questions" },
                    { id: "t31", text: "Solve 20–30 LeetCode Easy/Medium problems" },
                    { id: "t32", text: "Conduct Mock interviews (Pramp, peers)" },
                    { id: "t33", text: "Start applying for roles" }
                ]
            }
        ],
        deliverable: {
            title: "Goal: Get Job Interviews",
            text: "Your resume, portfolio, and interview skills should be sharp and ready to impress recruiters."
        }
    }
};

let state = {
    currentPhase: 'phase1',
    tasks: []
};

function initializeState() {
    const allTasks = [];
    Object.values(planData).forEach(phase => {
        phase.categories.forEach(category => {
            category.tasks.forEach(task => {
                allTasks.push({ ...task, completed: false, notes: '' }); // Add notes field
            });
        });
    });
    
    const savedTasks = localStorage.getItem('mlRoadmapTasks');
    if (savedTasks) {
        const loadedTasks = JSON.parse(savedTasks);
        // Merge loaded tasks with allTasks to ensure new tasks are added and old ones retain their state
        state.tasks = allTasks.map(task => {
            const savedTask = loadedTasks.find(t => t.id === task.id);
            return savedTask ? { ...task, ...savedTask } : task;
        });
    } else {
        state.tasks = allTasks;
    }
}

function saveState() {
    localStorage.setItem('mlRoadmapTasks', JSON.stringify(state.tasks));
}

function renderContent() {
    const phase = planData[state.currentPhase];
    const contentArea = document.getElementById('content-area');
    
    let html = `<div class="fade-in">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">${phase.title}</h2>
        <p class="text-gray-600 mb-6">${phase.intro}</p>`;
    
    phase.categories.forEach(category => {
        html += `<h3 class="text-xl font-semibold text-gray-700 mt-6 mb-3">${category.title}</h3>
                 <ul class="space-y-2">`;
        category.tasks.forEach(task => {
            const taskState = state.tasks.find(t => t.id === task.id);
            const isCompleted = taskState ? taskState.completed : false;
            const notes = taskState ? taskState.notes : '';
            html += `
                <li class="task-item p-3 rounded-lg transition-colors ${isCompleted ? 'completed' : ''}">
                    <div class="flex items-center">
                        <input type="checkbox" id="${task.id}" data-task-id="${task.id}" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${isCompleted ? 'checked' : ''}>
                        <label for="${task.id}" class="ml-3 block text-gray-800 text-base cursor-pointer">${task.text}</label>
                    </div>
                    <textarea data-task-id="${task.id}" class="task-notes mt-2 w-full p-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Add your notes here..." rows="2">${notes}</textarea>
                </li>`;
        });
        html += `</ul>`;
    });

    if(phase.deliverable) {
        html += `
            <div class="mt-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 class="text-xl font-bold text-blue-800 flex items-center">
                    <span class="mr-2">🎯</span>
                    Deliverable: ${phase.deliverable.title}
                </h3>
                <p class="text-blue-700 mt-2">${phase.deliverable.text}</p>
            </div>
        `;
    }
    
    html += `</div>`;
    contentArea.innerHTML = html;

    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.toggle('nav-active', button.dataset.phase === state.currentPhase);
    });
}

function updateDashboard() {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed).length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    document.getElementById('totalTasks').innerText = totalTasks;
    document.getElementById('completedTasks').innerText = completedTasks;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
    document.getElementById('progressPercentage').innerText = `${percentage}% Complete`;

    updateChart(completedTasks, totalTasks - completedTasks);
}

let progressChart;
function setupChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data: [0, state.tasks.length],
                backgroundColor: ['#2563EB', '#E5E7EB'],
                borderColor: ['#FFFFFF'],
                borderWidth: 4,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                }
            }
        }
    });
}

function updateChart(completed, remaining) {
    if (progressChart) {
        progressChart.data.datasets[0].data = [completed, remaining];
        progressChart.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeState();
    setupChart();
    renderContent();
    updateDashboard();

    document.querySelector('nav').addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-button')) {
            state.currentPhase = e.target.dataset.phase;
            renderContent();
        }
    });

    document.getElementById('content-area').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const taskId = e.target.dataset.taskId;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = e.target.checked;
                saveState();
                updateDashboard();
                e.target.closest('.task-item').classList.toggle('completed', task.completed);
            }
        }
    });

    document.getElementById('content-area').addEventListener('input', (e) => {
        if (e.target.classList.contains('task-notes')) {
            const taskId = e.target.dataset.taskId;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.notes = e.target.value;
                saveState();
            }
        }
    });
});
