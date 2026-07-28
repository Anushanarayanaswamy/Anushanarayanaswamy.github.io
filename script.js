/* -------------------------------------------------------------------
   ANUSHA N - DEVOPS ENGINEER PORTFOLIO INTERACTIVE SCRIPT
------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroTypewriter();
  initScrollCounters();
  initSkillsFilter();
  initPipelineSimulator();
  initInteractiveCLI();
});

/* 1. Navbar Scroll Effect & Mobile Drawer */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  });
}

/* 2. Hero Terminal Typewriter Effect */
function initHeroTypewriter() {
  const element = document.getElementById('typewriter-hero');
  if (!element) return;

  const commands = [
    'kubectl get nodes -o wide',
    'helm upgrade --install ca-apm ./chart --namespace production',
    'az aks get-credentials --resource-group prod-rg --name ca-apm-aks',
    'docker build -t ca-apm-service:v2.4.0 .',
    'python3 backup_script.py --db mysql_prod --target s3://db-backups'
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const currentCmd = commands[cmdIndex];

    if (isDeleting) {
      element.textContent = currentCmd.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      element.textContent = currentCmd.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIndex === currentCmd.length) {
      isDeleting = true;
      typeSpeed = 2500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* 3. Number Counter Animation */
function initScrollCounters() {
  const counters = document.querySelectorAll('.counter');
  const decimalCounters = document.querySelectorAll('.counter-decimal');
  let animated = false;

  function checkScroll() {
    const section = document.querySelector('.metrics-section');
    if (!section) return;

    const position = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (position < screenPosition && !animated) {
      animated = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 40;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });

      decimalCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 40;

        const updateDecimal = () => {
          count += increment;
          if (count < target) {
            counter.innerText = count.toFixed(1);
            setTimeout(updateDecimal, 30);
          } else {
            counter.innerText = target.toFixed(1);
          }
        };
        updateDecimal();
      });
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

/* 4. Technical Skills Filter */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* 5. Interactive CI/CD Pipeline Simulator */
function initPipelineSimulator() {
  const startBtn = document.getElementById('start-pipeline-btn');
  const resetBtn = document.getElementById('reset-pipeline-btn');
  const statusEl = document.getElementById('pipeline-status');
  const consoleLog = document.getElementById('pipeline-console-log');
  const stages = document.querySelectorAll('.pipeline-stage');

  if (!startBtn) return;

  let isRunning = false;

  const logs = [
    { stage: 1, text: "[STAGE 1] Triggering Git Push hook on main branch... Verification passed.", class: "c-info" },
    { stage: 2, text: "[STAGE 2] Azure Pipelines triggered. Running Maven build & unit test suite... 100% Passed.", class: "c-info" },
    { stage: 3, text: "[STAGE 3] SonarQube Code Quality & Security Gate check... 0 Vulnerabilities, 0 Code Smells.", class: "c-success" },
    { stage: 4, text: "[STAGE 4] Docker building image 'anusha/ca-apm-prod:v2.4.0' & pushing to Azure Container Registry.", class: "c-info" },
    { stage: 5, text: "[STAGE 5] Kubernetes Rolling Update initiated on AKS cluster. Zero Downtime verified.", class: "c-success" },
    { stage: 6, text: "[STAGE 6] Prometheus metrics active. Grafana alert status: NORMAL (99.99% Health).", class: "c-success" }
  ];

  function appendLog(text, className) {
    const p = document.createElement('div');
    p.className = `log-line ${className}`;
    p.innerHTML = `<span class="t-muted">[${new Date().toLocaleTimeString()}]</span> ${text}`;
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  function resetPipeline() {
    isRunning = false;
    stages.forEach(s => s.classList.remove('active', 'success'));
    statusEl.innerHTML = `<span class="status-dot"></span> System Ready`;
    consoleLog.innerHTML = `<span class="c-info">[INFO] Click 'Trigger Production Pipeline' to initiate automated pipeline execution...</span>`;
    startBtn.disabled = false;
  }

  async function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    consoleLog.innerHTML = '';
    stages.forEach(s => s.classList.remove('active', 'success'));

    statusEl.innerHTML = `<span class="status-dot" style="background:#00f2fe; box-shadow:0 0 8px #00f2fe;"></span> Running Automated CI/CD...`;

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      stage.classList.add('active');
      
      appendLog(logs[i].text, logs[i].class);
      await new Promise(r => setTimeout(r, 1200));

      stage.classList.remove('active');
      stage.classList.add('success');
    }

    statusEl.innerHTML = `<span class="status-dot" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span> Deployment Completed Successfully!`;
    appendLog("🎉 PIPELINE RUN SUCCESSFUL: Release v2.4.0 is Live on AKS Production Cluster!", "c-success");
    startBtn.disabled = false;
    isRunning = false;
  }

  startBtn.addEventListener('click', runPipeline);
  resetBtn.addEventListener('click', resetPipeline);
}

/* 6. Interactive Terminal CLI */
function initInteractiveCLI() {
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const quickBtns = document.querySelectorAll('.cli-btn');

  if (!cliInput) return;

  const commandsHelp = {
    'help': `Available Commands:
  • <span class="t-cmd">skills</span>       - List core technical skills & cloud tools
  • <span class="t-cmd">experience</span>   - View professional work history
  • <span class="t-cmd">certs</span>        - View AZ-400 & DevOps certifications
  • <span class="t-cmd">contact</span>      - View email, phone, location & GitHub
  • <span class="t-cmd">deploy</span>       - Trigger automated CI/CD pipeline simulation
  • <span class="t-cmd">clear</span>        - Clear terminal output`,

    'skills': `<strong>Cloud Platforms:</strong> AWS (EC2, VPC, S3, IAM, Lambda), Microsoft Azure (Azure DevOps, VMs, AKS)
<strong>CI/CD & IaC:</strong> Azure Pipelines, Jenkins, Terraform, Ansible, GitLab CI/CD, GitHub Actions
<strong>Containers & K8s:</strong> Docker, Kubernetes (Rollouts, HPA, Ingress)
<strong>Monitoring:</strong> Prometheus, Grafana, Dynatrace, Datadog, CloudWatch
<strong>Scripting & DB:</strong> Python, Bash Scripting, Cron, MySQL, Linux (Ubuntu/CentOS)`,

    'experience': `1. <strong>EITB Global Info Solutions Pvt Ltd</strong> (Mar 2026 - Present)
   Role: DevOps Engineer | CA-APM Project
   - Azure DevOps CI/CD Pipelines (40% deployment speedup)
   - Cloudflare DNS, CDN, WAF (25% response time improvement)
   - Automated MySQL & Web Backups via Python/Bash (80% effort reduction)

2. <strong>Texiio Global Private Limited</strong> (Oct 2022 - Mar 2025)
   Role: DevOps Engineer
   - Multi-cloud AWS & Azure infrastructure (99.9% Uptime)
   - Terraform IaC automation (60% deployment time reduction)
   - Docker & Kubernetes microservices orchestration`,

    'certs': `✔ <strong>AZ-400:</strong> Designing & Implementing Microsoft DevOps Solutions (Microsoft)
✔ <strong>AZ-104:</strong> Microsoft Azure Administrator (KodeKloud)
✔ <strong>Jenkins:</strong> CI/CD Automation Mastery (KodeKloud)
✔ <strong>Git:</strong> Version Control Training (KodeKloud)
✔ <strong>Python:</strong> Development & Scripting Internship (Techno Fly Solutions)`,

    'contact': `📧 <strong>Email:</strong> anushakn041@gmail.com
📞 <strong>Phone:</strong> +91 7892270344
📍 <strong>Location:</strong> Chennai, Tamil Nadu, India
🔗 <strong>LinkedIn:</strong> linkedin.com/in/anushanarayanaswamy
🐙 <strong>GitHub:</strong> github.com/Anushanarayanaswamy`
  };

  function printOutput(cmd, outputHTML) {
    const line = document.createElement('div');
    line.style.marginBottom = '12px';
    line.innerHTML = `
      <div><span class="t-user">anusha@devops</span>:<span class="t-path">~$</span> ${cmd}</div>
      <div style="color: #cbd5e1; margin-left: 10px;">${outputHTML}</div>
    `;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      cliOutput.innerHTML = '';
      return;
    }

    if (cmd === 'deploy') {
      printOutput(cmd, "Initiating pipeline simulation...");
      document.getElementById('start-pipeline-btn')?.click();
      document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (commandsHelp[cmd]) {
      printOutput(cmd, commandsHelp[cmd].replace(/\n/g, '<br>'));
    } else {
      printOutput(cmd, `<span style="color:#ef4444;">zsh: command not found: ${cmd}</span>. Type <span class="t-cmd">'help'</span> for available commands.`);
    }
  }

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cliInput.value;
      cliInput.value = '';
      handleCommand(val);
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      handleCommand(cmd);
    });
  });
}

/* 7. Real Email Contact Form Submission via FormSubmit API */
async function handleFormSubmit() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.querySelector('#contact-form button[type="submit"]');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !subject || !message) {
    feedback.style.color = '#ef4444';
    feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all fields.`;
    return;
  }

  feedback.style.color = '#00f2fe';
  feedback.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message directly to anushakn041@gmail.com...`;
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://formsubmit.co/ajax/anushakn041@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: `[Portfolio Contact] ${subject}`,
        message: message,
        _captcha: 'false'
      })
    });

    const data = await response.json();

    if (response.ok || data.success === "true" || data.success === true) {
      feedback.style.color = '#10b981';
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Success! Your message was delivered to anushakn041@gmail.com.`;
      document.getElementById('contact-form').reset();
    } else {
      throw new Error(data.message || 'Submission error');
    }
  } catch (err) {
    console.warn('FormSubmit endpoint error or network issue, using mailto fallback:', err);
    feedback.style.color = '#f59e0b';
    feedback.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Opening mail client for anushakn041@gmail.com...`;

    setTimeout(() => {
      window.location.href = `mailto:anushakn041@gmail.com?subject=${encodeURIComponent('[Portfolio Contact] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message)}`;
    }, 800);
  } finally {
    submitBtn.disabled = false;
  }
}

