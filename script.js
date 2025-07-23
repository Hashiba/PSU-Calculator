document.getElementById('psuForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const cpu = parseInt(document.getElementById('cpu').value);
  const gpu = parseInt(document.getElementById('gpu').value);
  const ram = parseInt(document.getElementById('ram').value);
  const storage = parseInt(document.getElementById('storage').value);
  const overclocking = document.getElementById('overclocking').checked;

  let total = cpu + gpu;
  total += ram * 2;      // estimate 2W per GB of RAM
  total += storage * 5;  // estimate 5W per drive

  if (overclocking) total *= 1.2;

  const rounded = Math.ceil(total / 50) * 50 + 100;

  document.getElementById('result').textContent = `Recommended PSU: ${rounded}W`;
});
