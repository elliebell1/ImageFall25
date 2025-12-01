
import os

BRIGHTNESS_FACTOR = 2.5
MAX_VALUE = 1.0
DEFAULT_KD = [0.5, 0.5, 0.5]  # If missing, use this

for root, _, files in os.walk('.'):
    for file in files:
        if file.lower().endswith('.mtl'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                lines = f.readlines()
            new_lines = []
            has_kd = False
            for line in lines:
                if line.strip().startswith('Kd'):
                    has_kd = True
                    parts = line.strip().split()
                    kd = [min(float(parts[i]) * BRIGHTNESS_FACTOR, MAX_VALUE) for i in range(1, 4)]
                    new_lines.append(f'Kd {kd[0]:.6f} {kd[1]:.6f} {kd[2]:.6f}\n')
                else:
                    new_lines.append(line)
                if line.strip().startswith('newmtl'):
                    # Reset for each material
                    has_kd = False
            # Add default Kd if missing
            for i, line in enumerate(new_lines):
                if line.strip().startswith('newmtl'):
                    # Check next few lines for Kd
                    found_kd = False
                    for j in range(i+1, min(i+6, len(new_lines))):
                        if new_lines[j].strip().startswith('Kd'):
                            found_kd = True
                            break
                    if not found_kd:
                        new_lines.insert(i+1, f'Kd {DEFAULT_KD[0]:.6f} {DEFAULT_KD[1]:.6f} {DEFAULT_KD[2]:.6f}\n')
            with open(path, 'w') as f:
                f.writelines(new_lines)
            print(f'Checked and updated: {path}')


