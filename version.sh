#!/bin/bash
# Usuń poprzednie pliki

# publish.sh
#!/bin/bash

# Zainstaluj w trybie edytowalnym
python changelog.py
bash git.sh
bash publish.sh

echo "Publication complete!"