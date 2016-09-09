import csv
import json

FILENAME = 'res/Spell_List_by_MadBeard_v1.0.csv'

fieldnames = [
    'spellName',
    'spellLevel',
    'ritual',
    'school',
    'castingTime',
    'range',
    'components',
    'materialComponent',
    'duration',
    'classBard',
    'classCleric',
    'classDruid',
    'classPaladin',
    'classRanger',
    'classSorcerer',
    'classWarlock',
    'classWizard',
    'description',
    'numClasses'
    ]

reader = None

infile = open(FILENAME, 'r')
reader = csv.DictReader(infile, fieldnames=fieldnames);

if reader == None:
    print("Error reading csv or something idk")
    exit(1)

# spellName : { ... }
# outputjson = {}
# for row in reader:
#     d = {}
#     spellName = ""
#     for name in fieldnames:
#         if name == "spellName":
#             spellName = row[name]
#             continue
#         d[name] = row[name]
#     outputjson[spellName] = d

outputjson = []
for row in reader:
    d = {}
    for name in fieldnames:
        d[name] = row[name]
    outputjson.append(d)

with open('spells.json', 'w') as f:
    f.write(json.dumps({'spellList': outputjson}, sort_keys=True, indent=4))

infile.close()
