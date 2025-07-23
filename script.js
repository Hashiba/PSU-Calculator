// Load parts from JSON dynamically
fetch('parts.json')
  .then(response => response.json())
  .then(data => {
    const cpuSelect = document.getElementById('cpu');
    const gpuSelect = document.getElementById('gpu');

    // Clear existing options
    cpuSelect.innerHTML = '';
    gpuSelect.innerHTML = '';

    // Populate CPUs
    data.cpus.forEach(cpu => {
      const option = document.createElement('option');
      option.value = cpu.tdp;
      option.textContent = cpu.name;
      cpuSelect.appendChild(option);
    });

    // Populate GPUs
    data.gpus.forEach(gpu => {
      const option = document.createElement('option');
      option.value = gpu.tdp;
      option.textContent = gpu.name;
      gpuSelect.appendChild(option);
    });
  });

// Power supply calculation logic
document.getElementById('psuForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const cpu = parseInt(document.getElementById('cpu').value);
  const gpu = parseInt(document.getElementById('gpu').value);
  const ram = parseInt(document.getElementById('ram').value);
  const storage = parseInt(document.getElementById('storage').value);
  const overclocking = document.getElementById('overclocking').checked;

  let total = cpu + gpu;
  total += ram * 2;      // Estimate: 2W per GB RAM
  total += storage * 5;  // Estimate: 5W per drive

  if (overclocking) total *= 1.2;

  const rounded = Math.ceil(total / 50) * 50 + 100;

  document.getElementById('result').textContent = `Recommended PSU: ${rounded}W`;
});
