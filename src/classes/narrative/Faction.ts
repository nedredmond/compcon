import { CloudController, PortraitController, SaveController } from '../components';
import { NarrativeController } from './NarrativeController';
import { CollectionItem, ICollectionItemData } from './CollectionItem';
import { ItemType } from '../enums';

class FactionData extends ICollectionItemData {
  collectionItemType: string = 'faction';
}

class Faction extends CollectionItem {
  public ItemType: string = ItemType.Faction;

  public constructor(data?: FactionData) {
    super(data);
    this.Name = data?.name || 'New Faction';
  }

  public get SectionSuggestions(): string[] {
    return [
      'Formation and Origins',
      'Resources and Holdings',
      'Objectives and Mission',
      'Key Leaders and Members',
      'Historical Background and Context',
      'Activities and Initiatives',
      'Structure and Organization',
      'Achievements and Milestones',
      'Challenges Faced',
      'Ideology and Beliefs',
      'Notable Events',
      'Relationships and Alliances',
      'Controversies and Criticisms',
      'Influence and Extents',
      'Current Status and Impact',
    ];
  }

  public static Serialize(faction: Faction): FactionData {
    let data = {
      collectionItemType: 'faction',
      id: faction.ID,
      name: faction.Name,
      note: faction.Note,
    };

    SaveController.Serialize(faction, data);
    CloudController.Serialize(faction, data);
    PortraitController.Serialize(faction, data);
    NarrativeController.Serialize(faction, data);

    return data as FactionData;
  }

  public Serialize<FactionData>(): FactionData {
    return Faction.Serialize(this) as FactionData;
  }

  public static Deserialize(data: FactionData): Faction {
    const faction = new Faction(data);
    SaveController.Deserialize(faction, data.save);
    PortraitController.Deserialize(faction, data.img);
    NarrativeController.Deserialize(faction, data.narrative);
    return faction;
  }

  public Clone<Faction>(): Faction {
    const itemData = Faction.Serialize(this);
    const newItem = Faction.Deserialize(itemData);
    newItem.RenewID();
    newItem.Name += ' (COPY)';
    return newItem as Faction;
  }
}

export { Faction, FactionData };
